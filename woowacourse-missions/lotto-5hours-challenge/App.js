import { Random, Console } from "@woowacourse/mission-utils";
import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import Lotto from "./Lotto.js";

class App {
  async run() {
    const inputView = new InputView();
    const outputView = new OutputView();

    const price = await this.#readPrice(inputView);

    const count = price / 1000;
    const lottos = this.#generateLottos(count);

    outputView.printCount(count);
    outputView.printLottos(lottos);

    const winningNumbers = await inputView.readWinningNumbers();
    const bonusNumber = await inputView.readBonusNumber();

    const result = this.#calculateResult(lottos, winningNumbers, bonusNumber);
    const earningRate = this.#calculateEarningRate(result, price);
    outputView.printResult(result);
    outputView.printEarningRate(earningRate);
  }

  async #readPrice(inputView) {
    try {
      const price = await inputView.readPrice();
      this.#validatePrice(price);
      return price;
    } catch (error) {
      Console.print(error.message);
      return this.#readPrice(inputView);
    }
  }

  #validatePrice(price) {
    if (Number.isNaN(price) || price < 1000) {
      throw new Error("[ERROR] 유효한 금액을 입력해주세요.");
    }
    if (price % 1000 !== 0) {
      throw new Error("[ERROR] 1000원 단위로 입력해주세요.");
    }
  }

  #generateLottos(count) {
    const lottos = [];
    for (let i = 0; i < count; i++) {
      const numbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      lottos.push(new Lotto(numbers));
    }
    return lottos;
  }

  #getRank(matchCount, hasBonus) {
    if (matchCount === 6) return 6;
    if (matchCount === 5 && hasBonus) return "5+bonus";
    if (matchCount === 5) return 5;
    if (matchCount === 4) return 4;
    if (matchCount === 3) return 3;
    return null;
  }

  #calculateResult(lottos, winningNumbers, bonusNumber) {
    const result = { 3: 0, 4: 0, 5: 0, "5+bonus": 0, 6: 0 };

    for (const lotto of lottos) {
      const matchCount = lotto.getMatchCount(winningNumbers);
      const hasBonus = lotto.hasBonusNumber(bonusNumber);
      const rank = this.#getRank(matchCount, hasBonus);

      if (rank) result[rank] += 1;
    }
    return result;
  }

  #calculateEarningRate(result, price) {
    const prizeMoney = {
      3: 5000,
      4: 50000,
      5: 1500000,
      "5+bonus": 30000000,
      6: 2000000000,
    };

    let totalPrize = 0;
    for (const rank in result) {
      totalPrize += result[rank] * prizeMoney[rank];
    }

    return ((totalPrize / price) * 100).toFixed(1);
  }
}

export default App;
