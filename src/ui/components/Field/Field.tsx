import classNames from 'classnames';
import styles from './Field.module.css';
import type { FieldProps } from './Field.types';
import type { jsonAnswer } from '../../../shared/types/common.types';
import parseDate from '../../../utils/parseDate';

export default function Field({ title, value }: FieldProps) {
  return (
    <div className={classNames(styles.field)}>
      <div>{value === undefined ? '-' : value}</div>
      <strong>{title}</strong>
    </div>
  );
}

export function FieldSet({
  secondary,
  data,
}: {
  secondary?: boolean;
  data: jsonAnswer;
}) {
  return (
    <div className={classNames(styles.fieldset, secondary && styles.secondary)}>
      <Field
        title="общие расходы в галактических кредитах"
        value={data.total_spend_galactic}
      />
      <Field
        title="количество обработанных записей"
        value={data.rows_affected}
      />
      <Field
        title="день года с минимальными расходами"
        value={parseDate(data.less_spent_at)}
      />
      <Field
        title="цивилизация с минимальными расходами"
        value={data.less_spent_civ}
      />
      <Field
        title="день года с максимальными расходами"
        value={parseDate(data.big_spent_at)}
      />
      <Field
        title="максимальная сумма расходов за день"
        value={data.big_spent_value}
      />
      <Field
        title="средние расходы в галактических кредитах"
        value={data.average_spend_galactic}
      />
      <Field
        title="цивилизация с максимальными расходами"
        value={data.big_spent_civ}
      />
    </div>
  );
}
