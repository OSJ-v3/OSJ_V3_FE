export type AlarmType = "WASH" | "DRY";

export const mapExpectStateToType = (expectState: number): AlarmType => {
  return expectState === 1 ? "WASH" : "DRY";
};
