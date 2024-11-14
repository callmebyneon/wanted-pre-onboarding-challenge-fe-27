import { ONE_HOUR_IN_SECS } from "../times_unit_const";

export function getCreatedBefore(createdAt: string): string {
  const createdTime = Date.parse(createdAt);
  const thisTime = Date.now();
  // second: n/1000, minute: n/1000/60, hour: n/1000/60/60, day: n/1000/60/60/24 ...
  const diff = (thisTime - createdTime) / 1000;
  const times: Array<{
    unit:
      | "year"
      | "quarter"
      | "month"
      | "week"
      | "day"
      | "hour"
      | "minute"
      | "second";
    seconds: number;
  }> = [
    { unit: "year", seconds: ONE_HOUR_IN_SECS * 24 * 365 },
    { unit: "month", seconds: ONE_HOUR_IN_SECS * 24 * 30 },
    { unit: "week", seconds: ONE_HOUR_IN_SECS * 24 * 7 },
    { unit: "day", seconds: ONE_HOUR_IN_SECS * 24 },
    { unit: "hour", seconds: ONE_HOUR_IN_SECS },
    { unit: "minute", seconds: 60 },
  ];
  const rtf = new Intl.RelativeTimeFormat("ko", { style: "short" });

  // 년 단위부터 알맞는 단위 찾기
  for (const value of times) {
    const betweenTime = Math.floor(diff / value.seconds);

    // 큰 단위는 0보다 작은 소수 단위 나옴
    if (betweenTime > 0) {
      return rtf.format(betweenTime * -1, value.unit);
    }
  }

  // 모든 단위가 맞지 않을 시
  return "방금 전";
}