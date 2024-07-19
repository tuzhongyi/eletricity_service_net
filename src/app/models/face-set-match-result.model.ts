import { IModel } from './model.interface';

/**	FaceSetMatchResult (人脸比对结果)	*/
export class FaceSetMatchResult implements IModel {
  /**	String	人脸库ID	M	*/
  FaceSetId!: string;
  /**	String	人脸库名称	M	*/
  FaceSetName!: string;
  /**	String	人脸库中的唯一ID	M	*/
  FaceId!: string;
  /**	String	人脸库中的名称	O	*/
  FaceName?: string;
  /**	String	人脸库中的照片ID	O	*/
  FaceUrl?: string;
  /**	Double	相似度，[0-1]	M	*/
  Similarity!: number;
}
