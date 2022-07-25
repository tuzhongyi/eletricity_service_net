/** */
export class ExceptionData {
  /**	String	异常消息	M */
  Message!: string;
  /**	String	异常类型	M */
  ExceptionType!: string;
  /**	ExceptionData	内部异常	O */
  InnerException?: ExceptionData;
}

/**
 * 应答信息
 */
export class HowellResponse<T> {
  /**	Int32	错误码间附录3.3	M */
  FaultCode!: number;
  /**	String 	错误原因	M */
  FaultReason!: string;
  /**	ExceptionData	内部异常	O */
  InnerException?: ExceptionData;
  /**	T	应答实体数据	O */
  Data?: T;
}
