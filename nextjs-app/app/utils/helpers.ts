export function percentExpired(range: number, current: number): number {
  return (1 - (current / range)) * 100;
}
