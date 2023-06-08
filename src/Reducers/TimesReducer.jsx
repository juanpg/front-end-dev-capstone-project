import dayjs from 'dayjs';
import customParseFormat from 'dayjs';

dayjs.extend(customParseFormat);

const updateTimes = (state, action) => {
  if(action.type === 'new_date') {
    if(action.newDate === null) {
      return [];
    }

    const date = dayjs(action.newDate, 'YYYY-MM-DD').toDate();
    return fetchAPI(date);
  }

  throw Error(`Unknown action: ${action.type}`);
}

const initializeTimes = () => [];  // ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

export { updateTimes, initializeTimes };