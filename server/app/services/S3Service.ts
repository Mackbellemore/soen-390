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
    const uploadParams = {
      Bucket: this.config.get<string>('aws.bucket'),
      Key: key.toString(),
      Body: img.buffer,
    };

    try {
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
    const isDev = this.config.get<boolean>('env');
    const bucket = this.config.get<string>('aws.bucket');
    let url = '';
    if (isDev) {
      url = `${this.config.get<string>('aws.localEndpoint')}/${bucket}/${key}`;
    } else {
      url = `https://${bucket}.s3-${this.config.get<string>('aws.region')}.amazonaws.com/${key}`;
    }
    return url;
  }
}
