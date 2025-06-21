import { useState } from 'react';
import StateButton, { type state } from '../components/StateButton/StateButton';
import fetchReport from '../../api/fetchReport';

export default function Generate() {
  const [state, changeState] = useState<state>('basic');

  const handleStartParsing = async () => {
    changeState('loading');
    await fetchReport({
      success: () => {
        changeState('success');
      },
      failed: () => {
        changeState('error');
      },
      searchParams: {
        size: '0.1',
        withErrors: 'off',
        maxSpend: '10000',
      },
    });
  };

  return (
    <div className="area">
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
