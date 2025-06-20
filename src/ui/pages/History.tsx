import { useRequestHistoryStore } from '../../store/useRequestHistoryStore';
import Button, { Buttons } from '../components/Button/Button';
import { HistoryItems } from '../components/HistoryItem/HistoryItem';

export default function History() {
  const { history, clearHistory } = useRequestHistoryStore();
  return (
    <div className="area">
      <HistoryItems items={history} />
      <div id="modalArea"></div>
      <Buttons>
        <Button>Сгенерировать больше</Button>
        <Button clear onClick={() => clearHistory()}>
          Очистить всё
        </Button>
      </Buttons>
    </div>
  );
}
