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
  /**	人员奔跑	8 */
  Run = 8,
  /**	人员聚集	9 */
  HighDensity = 9,
  /**	业务行为，递交材料	11 */
  Business = 11,
  /**	遗留物品	14 */
  Unattended = 14,
  /**	玩手机	16 */
  PlayPhone = 16,
  /**	打砸或移动设备	17 */
  SmashDevice = 17,
  /** 非正常音频报警，（分贝、骂人） */
  IllegalAudio = 21,
  /**	未开早班会	22 */
  NoMorningMeeting = 22,
}
