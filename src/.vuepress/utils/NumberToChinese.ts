export function numberToChinese(num: number): string {
  const chineseNumbers = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  return Array.from(Array(num).keys())
    .reduce((acc: string[], _) => {
      const digit = num % 10;
      if (digit !== 0) {
        acc.push(chineseNumbers[digit]);
      }
      num = Math.floor(num / 10);
      return acc;
    }, [])
    .reverse()
    .join("");
}
