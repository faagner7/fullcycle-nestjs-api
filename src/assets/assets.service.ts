import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { Asset } from './entities/asset.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AssetsService {
  constructor(@InjectModel(Asset.name) private assetSchema: Model<Asset>) {}

  async create(createAssetDto: CreateAssetDto) {
    const existingAsset = await this.assetSchema.findOne({
      symbol: createAssetDto.symbol,
    });
    if (existingAsset) {
      throw new ConflictException('Asset already exists');
    }
    return this.assetSchema.create(createAssetDto);
  }
  findAll() {
    return this.assetSchema.find();
  }

  findOne(symbol: string) {
    return this.assetSchema.findOne({ symbol });
  }
}
