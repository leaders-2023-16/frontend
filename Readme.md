# leaders-2023-16 Frontend App

### Для запуска в dev 
 - `yarn`
 - `yarn dev`
### Для сборки в prod 
 - `yarn` 
 - `yarn build` 
  > Все собранные файлы будут лежать в папке `/dist` 
### Необходимые версии:
- node>=16.20.0
- yarn>=1.22.19


### REMOVE WHEN RELEASE

trainee login

trainee@user.com
admin2admin


### Алгритм распределения стажеров по работам

- Отсортировать вакансии по кол-ву откликов
- Если в вакансии ноль откликов никто не идет
- Если в вакансии всего один и более откликов принимается первый кто еще не устроен
- Если в вакансии все стажеры из откликов устроены, сравнивается кол-во откликов на текущую вакансию
и кол-во откликов на вакансию трудоустроенного стажера с минимальным кол-вом откликов, если число больше, то работник с устроенной
вакансии переносится на новую

