import { useState } from 'react';
import StateButton, {
  type button_state,
} from '../components/StateButton/StateButton';
import fetchReport from '../../api/fetchReport';

export default function Generate() {
  const [state, changeState] = useState<button_state>('basic');

  const searchParams = {
    size: '0.01',
    withErrors: 'off',
    maxSpend: '10000',
  };

  const handleStartParsing = async () => {
    changeState('loading');
    await fetchReport({
      success: () => {
        changeState('success');
      },
      failed: () => {
        changeState('error');
      },
      searchParams: searchParams,
    });
  };

  return (
    <div className="area">
      <p style={{ fontSize: '1.2rem', textAlign: 'center' }}>
        Сгенерируйте готовый csv-файл нажатием одной кнопки
      </p>
      <StateButton
        onClick={() => {
          handleStartParsing();
        }}
        onReset={() => changeState('basic')}
        state={state}
      >
        Сгенерировать файл
      </StateButton>
    </div>
  );
}
