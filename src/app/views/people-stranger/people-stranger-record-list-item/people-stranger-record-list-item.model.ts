import { FaceSetMatchResult } from 'src/app/models/face-set-match-result.model';
import { StrangerRecord } from 'src/app/models/stranger-record.model';
import { UrlTool } from 'src/app/tools/url-tool/url.tool';

export class StrangerRecordModel extends StrangerRecord {
  override FacePictureUrl: string = UrlTool.image.error;
  override BackgroundUrl: string = UrlTool.image.error;
  override FaceSetMatch?: FaceSetMatchResultModel;
}
export class FaceSetMatchResultModel extends FaceSetMatchResult {
  override FaceUrl: string = UrlTool.image.error;
}
