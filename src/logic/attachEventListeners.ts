import { IField } from '../index';
import isCheckbox from '../utils/isCheckBox';

export default function attachEventListeners({
  mode,
  field,
  watchFields,
  radioOptionIndex,
  validateAndStateUpdate,
  isWatchAll = false,
  isRadio,
}: {
  mode: string;
  field: IField;
  watchFields: { [key: string]: boolean };
  radioOptionIndex: number;
  isRadio: boolean;
  validateAndStateUpdate: (
    {
      target: { name },
      type,
    }: any,
  ) => void;
  isWatchAll?: boolean;
}) {
  const { ref } = field;
  const isOnChange = mode === 'onChange' || watchFields[ref.name] || isWatchAll;
  const isOnBlur = mode === 'onBlur';
  if (!isOnChange && !isOnBlur) return;

  const event = isOnChange ? (isRadio || isCheckbox(ref.type) ? 'change' : 'input') : 'blur';

  if (isRadio && field.options) {
    const options = field.options;
    const attachedEvents = options[radioOptionIndex].eventAttached || '';

    if (!options[radioOptionIndex] || attachedEvents.includes(event)) return;

    options[radioOptionIndex].ref.addEventListener(event, validateAndStateUpdate);
    options[radioOptionIndex].eventAttached = [...(attachedEvents || []), event];
  } else {
    if (field && field.eventAttached && field.eventAttached.includes(event)) return;

    ref.addEventListener(event, validateAndStateUpdate);
    field.eventAttached = [...(field.eventAttached || []), event];
  }
}
