var express = require('express');
const moment = require('moment');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//  Получение данных для формирования календаря
router.get('/:year/:month/', function(req, res, next) {

  //  Создание передаваемого объекта на front
  const calendar = {
    title: 'Calendar',
    year: req.params.year,
    month: req.params.month,
    daysImMonth: moment(`${req.params.year}/${req.params.month}`, 'YYYY/MM').daysInMonth(),
    week: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
    firstDayMonth: Number(moment(`${req.params.year}/${req.params.month}`, 'YYYY/MM').format('E')),
  }

  calendar.divsNum = calendar.daysImMonth + calendar.week.length + calendar.firstDayMonth;
  res.render('index', calendar);
});

module.exports = router;
