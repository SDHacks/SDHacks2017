const scheduleData = [
  {
    start: 'Fri, 20 Oct 2017 19:00:00 -0700',
    end: 'Sat, 21 Oct 2017 00:00:00 -0700',
    name: 'Check In',
    showEnd: false,
  },
  {
    start: 'Fri, 20 Oct 2017 19:00:00 -0700',
    end: 'Fri, 20 Oct 2017 22:00:00 -0700',
    name: 'Dinner',
    showEnd: false,
  },
  {
    start: 'Fri, 20 Oct 2017 21:00:00 -0700',
    end: 'Fri, 20 Oct 2017 22:00:00 -0700',
    name: 'Opening Ceremony',
    showEnd: false,
  },
  {
    start: 'Fri, 20 Oct 2017 22:00:00 -0700',
    name: 'Hacking Begins',
    showEnd: false,
    showOnCurrent: false,
  },
  {
    start: 'Fri, 20 Oct 2017 20:00:00 -0700',
    end: 'Fri, 20 Oct 2017 20:30:00 -0700',
    name: 'Team Mixer',
    showEnd: false,
  },
  {
    start: 'Fri, 20 Oct 2017 22:30:00 -0700',
    end: 'Fri, 20 Oct 2017 23:15:00 -0700',
    name: 'Marines Innovation Challenge Info Session',
    showEnd: true,
  },
  {
    start: 'Fri, 20 Oct 2017 22:30:00 -0700',
    end: 'Fri, 20 Oct 2017 23:15:00 -0700',
    name: 'Qualcomm DragonBoard Workshop',
    showEnd: true,
  },
  {
    start: 'Fri, 20 Oct 2017 23:30:00 -0700',
    end: 'Sat, 21 Oct 2017 02:30:00 -0700',
    name: 'Virtual Reality and Gaming Workshop',
    showEnd: true,
  },
  {
    start: 'Fri, 20 Oct 2017 23:30:00 -0700',
    end: 'Sat, 21 Oct 2017 02:30:00 -0700',
    name: 'Nodeschool Workshop',
    showEnd: true,
  },

  // Saturday October 21
  {
    start: 'Sat, 21 Oct 2017 02:00:00 -0700',
    end: 'Sat, 21 Oct 2017 04:00:00 -0700',
    name: 'iOS Workshop',
    showEnd: true,
  },
  {
    start: 'Sat, 21 Oct 2017 08:30:00 -0700',
    end: 'Sat, 21 Oct 2017 11:00:00 -0700',
    name: 'Breakfast',
    showEnd: false,
  },
  {
    start: 'Sat, 21 Oct 2017 11:00:00 -0700',
    end: 'Sat, 21 Oct 2017 13:00:00 -0700',
    name: 'SPAWAR Tech Talk',
    showEnd: false,
  },
  {
    start: 'Sat, 21 Oct 2017 13:00:00 -0700',
    end: 'Sat, 21 Oct 2017 15:00:00 -0700',
    name: 'Lunch',
    showEnd: false,
  },
  // {
  //   start: 'Sat, 21 Oct 2017 14:00:00 -0700',
  //   end: 'Sat, 21 Oct 2017 14:45:00 -0700',
  //   name: 'UI/UX Design Workshop',
  //   showEnd: true,
  // },
  {
    start: 'Sat, 21 Oct 2017 15:00:00 -0700',
    end: 'Sat, 21 Oct 2017 15:45:00 -0700',
    name: 'Getting Into Game Development',
    host: 'Christian Sakanai - High Moon Studios',
    showEnd: true,
  },
  {
    start: 'Sat, 21 Oct 2017 19:30:00 -0700',
    end: 'Sat, 21 Oct 2017 21:30:00 -0700',
    name: 'Dinner',
    showEnd: false,
  },

  // Sunday October 22
  {
    start: 'Sun, 22 Oct 2017 07:00:00 -0700',
    end: 'Sun, 22 Oct 2017 09:00:00 -0700',
    name: 'Breakfast',
    showEnd: false,
  },
  {
    start: 'Sun, 22 Oct 2017 10:00:00 -0700',
    end: 'Sun, 22 Oct 2017 11:00:00 -0700',
    name: 'Lunch',
    showEnd: false,
  },
  {
    start: 'Sun, 22 Oct 2017 10:00:00 -0700',
    end: 'Sun, 22 Oct 2017 10:00:00 -0700',
    name: 'Hacking Ends',
    showEnd: false,
  },
  {
    start: 'Sun, 22 Oct 2017 11:00:00 -0700',
    end: 'Sun, 22 Oct 2017 13:00:00 -0700',
    name: 'Demos and Judging',
    showEnd: true,
  },
  {
    start: 'Sun, 22 Oct 2017 13:00:00 -0700',
    end: 'Sun, 22 Oct 2017 14:00:00 -0700',
    name: 'Closing Ceremony',
    showEnd: true,
  },
];

export default scheduleData;
