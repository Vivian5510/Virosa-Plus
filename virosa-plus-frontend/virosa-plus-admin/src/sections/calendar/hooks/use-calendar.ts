import type FullCalendar from '@fullcalendar/react';
import type { EventResizeDoneArg } from '@fullcalendar/interaction';
import type { EventDropArg, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import type { ICalendarView, ICalendarRange, ICalendarEvent } from 'src/types/calendar';

import { useRef, useState, useCallback } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ----------------------------------------------------------------------

export function useCalendar() {
  const calendarRef = useRef<FullCalendar>(null);
  const calendarEl = calendarRef.current;

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  const [date, setDate] = useState(new Date());

  const [openForm, setOpenForm] = useState(false);

  const [selectEventId, setSelectEventId] = useState('');

  const [selectedRange, setSelectedRange] = useState<ICalendarRange>(null);

  const [view, setView] = useState<ICalendarView>(smUp ? 'dayGridMonth' : 'listWeek');

  const onOpenForm = useCallback(() => {
    setOpenForm(true);
  }, []);

  const onCloseForm = useCallback(() => {
    setOpenForm(false);
    setSelectedRange(null);
    setSelectEventId('');
  }, []);

  const onInitialView = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      const newView = smUp ? 'dayGridMonth' : 'listWeek';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [calendarEl, smUp]);

  const onChangeView = useCallback(
    (newView: ICalendarView) => {
      if (calendarEl) {
        const calendarApi = calendarEl.getApi();

        calendarApi.changeView(newView);
        setView(newView);
      }
    },
    [calendarEl]
  );

  const onDateToday = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  }, [calendarEl]);

  const onDatePrev = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  }, [calendarEl]);

  const onDateNext = useCallback(() => {
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  }, [calendarEl]);

  const onSelectRange = useCallback(
    (arg: DateSelectArg) => {
      if (calendarEl) {
        const calendarApi = calendarEl.getApi();

        calendarApi.unselect();
      }

      onOpenForm();
      setSelectedRange({ start: arg.startStr, end: arg.endStr });
    },
    [calendarEl, onOpenForm]
  );

  const onClickEvent = useCallback(
    (arg: EventClickArg) => {
      const { event } = arg;

      onOpenForm();
      setSelectEventId(event.id);
    },
    [onOpenForm]
  );

  const onResizeEvent = useCallback(
    (arg: EventResizeDoneArg, updateEvent: (eventData: Partial<ICalendarEvent>) => void) => {
      const { event } = arg;

      updateEvent({
        id: event.id,
        allDay: event.allDay,
        start: event.startStr,
        end: event.endStr,
      });
    },
    []
  );

  const onDropEvent = useCallback(
    (arg: EventDropArg, updateEvent: (eventData: Partial<ICalendarEvent>) => void) => {
      const { event } = arg;

      updateEvent({
        id: event.id,
        allDay: event.allDay,
        start: event.startStr,
        end: event.endStr,
      });
    },
    []
  );

  const onClickEventInFilters = useCallback(
    (eventId: string) => {
      if (eventId) {
        onOpenForm();
        setSelectEventId(eventId);
      }
    },
    [onOpenForm]
  );

  return {
    calendarRef,
    /********/
    view,
    date,
    /********/
    onDatePrev,
    onDateNext,
    onDateToday,
    onDropEvent,
    onClickEvent,
    onChangeView,
    onSelectRange,
    onResizeEvent,
    onInitialView,
    /********/
    openForm,
    onOpenForm,
    onCloseForm,
    /********/
    selectEventId,
    selectedRange,
    /********/
    onClickEventInFilters,
  };
}
