Инструкция по запуску тестов
Jest тесты
Запуск всех тестов
npm test
Запуск тестов в режиме watch
npm run test:watch
Запуск тестов с покрытием кода
npm run test:coverage
После выполнения команды с покрытием, отчет будет доступен в папке coverage/.

Cypress тесты
Открытие Cypress в интерактивном режиме
npm run cypress:open
Запуск Cypress тестов в headless режиме
npm run cypress:run
Структура тестов
Jest тесты
src/services/__tests__/rootReducer.test.ts - тесты для rootReducer
src/services/slices/__tests__/constructorSlice.test.ts - тесты для constructorSlice
src/services/slices/__tests__/ingredientsSlice.test.ts - тесты для ingredientsSlice
Cypress тесты
cypress/e2e/constructor.cy.tsx - интеграционные тесты для конструктора бургера
Моковые данные
cypress/fixtures/ingredients.json - моковые данные ингредиентов
cypress/fixtures/user.json - моковые данные пользователя
cypress/fixtures/order.json - моковые данные заказа
Покрытие кода
Для просмотра покрытия кода тестами используйте команду:

npm run test:coverage
Отчет будет сгенерирован в папке coverage/. Откройте coverage/lcov-report/index.html в браузере для просмотра детального отчета.