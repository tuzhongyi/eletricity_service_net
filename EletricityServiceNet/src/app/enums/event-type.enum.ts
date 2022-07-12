/**
 * 事件类型
 */
export enum EventType {
  /**	上线	1 */
  Online = 1,
  /**	离线	2 */
  Offline = 2,
  /**	离岗	3 */
  LeavePosition = 3,
  /**	倒地	4 */
  Falldown = 4,
  /**	滞留/徘徊	5 */
  Loitering = 5,
  /**	剧烈运动	6 */
  Voilence = 6,
  /**	间距异常	7 */
  Spacing = 7,
  /**	业务行为，递交材料	11 */
  Business = 11,
}
