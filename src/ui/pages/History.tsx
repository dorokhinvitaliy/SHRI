import { useNavigate } from 'react-router-dom';
import { useRequestHistoryStore } from '../../store/useRequestHistoryStore';
import Button, { Buttons } from '../components/Button/Button';
import { HistoryItems } from '../components/HistoryItem/HistoryItem';

export default function History() {
  const { history, clearHistory } = useRequestHistoryStore();
  const navigate = useNavigate();

  return (
    <div className="area">
      <HistoryItems items={history} />
      <Buttons>
        <Button onClick={() => navigate('/')}>Сгенерировать больше</Button>
        <Button clear onClick={() => clearHistory()}>
          Очистить всё
        </Button>
      </Buttons>
    </div>
  );
}
