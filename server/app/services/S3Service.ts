import { BadRequestError } from '../errors';
import { S3 } from 'aws-sdk';
import { IConfig } from 'config';
import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';
import { File, IMAGE_MIME_TYPES } from '../constants/common';
import { Logger } from 'winston';

@injectable()
export class S3Service {
  @inject(TYPES.S3Client) private s3Client: S3;
  @inject(TYPES.config) private config: IConfig;
  @inject(TYPES.logger) private logger: Logger;

  public async uploadImage(key: string, img: File): Promise<string> {
    this.validateImage(img.mimetype);

    try {
      const uploadParams = {
        Bucket: this.config.get<string>('aws.bucket'),
        Key: `${key}.jpg`,
        Body: img.buffer,
      };

      await this.s3Client.upload(uploadParams).promise();
    } catch (err) {
      this.logger.warn(JSON.stringify(err));
      throw new BadRequestError('An error occured while uploading to S3');
    }
    return this.contructUrl(key);
  }

  public validateImage(mimetype: string): void {
    if (!IMAGE_MIME_TYPES.includes(mimetype)) {
      throw new BadRequestError(`Image of type ${mimetype} is not accepted`);
    }
  }

  public contructUrl(key: string): string {
    const isDev = this.config.get<string>('env') === 'development';
    const bucket = this.config.get<string>('aws.bucket');
    const region = this.config.get<string>('aws.region');

    let url = `https://${bucket}.s3-${region}.amazonaws.com/${key}.jpg`;

    if (isDev) {
      url = `http://localhost:4566/${bucket}/${key}.jpg`;
    }
    return url;
  }
}
