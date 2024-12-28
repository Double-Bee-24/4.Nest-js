import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { People } from 'src/people/entities/people.entity';
import { Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { PeopleResponse } from './interfaces/PeopleResponse.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SwapiService {
  private swapiUrl: string;

  constructor(
    @InjectRepository(People)
    private peopleRepository: Repository<People>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.swapiUrl = this.configService.get<string>('SWAPI_URL');
  }

  async getAmountOfDataFromSwapi(entityType: string): Promise<number> {
    const { data } = await lastValueFrom(
      this.httpService.get<{ total_records: number }>(
        `${this.swapiUrl}/${entityType}`,
      ),
    );

    return data.total_records;
  }

  async downloadDataFromSwapi(entityType: string): Promise<PeopleResponse[]> {
    const totalRecords = await this.getAmountOfDataFromSwapi(entityType);

    const requests = Array.from({ length: totalRecords }, async (_, index) => {
      try {
        const response = await lastValueFrom(
          this.httpService.get(`${this.swapiUrl}/${entityType}/${index + 1}`),
        );
        return response.data.result;
      } catch (error) {
        // Swapi server may not contain records with certain ids, in such cases we want our method to continue working
        if (error.response?.status === 404) {
          console.log(`Data for ID ${index + 1} not found`);
          return null;
        }
        console.error(`Error fetching data for ID ${index + 1}`, error);
        throw error; //Throw an error if it's not 404
      }
    });

    const responses = await Promise.all(requests);

    const peopleData: PeopleResponse[] = responses.filter(
      (elem): elem is PeopleResponse => elem !== null,
    );

    return peopleData;
  }

  async uploadDataToDb() {
    const data = await this.downloadDataFromSwapi('people');

    // Prepare data to be inserted into db
    const newData = data.map((item) => ({
      ...item.properties,
      id: item.uid,
      description: item.description,
    }));

    this.peopleRepository.save(newData);
  }
}
