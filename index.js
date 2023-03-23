// creates single employee record
function createEmployeeRecord(employeeArray) {
    const employeeRecord = {}
    employeeRecord.firstName = employeeArray[0]
    employeeRecord.familyName = employeeArray[1]
    employeeRecord.title = employeeArray[2]
    employeeRecord.payPerHour = employeeArray[3]
    employeeRecord.timeInEvents = []
    employeeRecord.timeOutEvents = []
    return employeeRecord
}
//process array of employees
function createEmployeeRecords(arr) {
    const newEmployees = []
    arr.forEach(employee => newEmployees.push(createEmployeeRecord(employee)))
    return newEmployees
}
//I want to merge these and just add a type arg
function createTimeInEvent(employee, timeInString) {
    const timeInObj = {}
    const slicedTime = timeInString.split(" ")
    timeInObj.type = "TimeIn"
    timeInObj.date = slicedTime[0]
    timeInObj.hour = parseInt(slicedTime[1])
    employee.timeInEvents.push(timeInObj)
    return employee
}
function createTimeOutEvent(employee, timeOutString) {
    const timeOutObj = {}
    const slicedTime = timeOutString.split(" ")
    timeOutObj.type = "TimeOut"
    timeOutObj.date = slicedTime[0]
    timeOutObj.hour = parseInt(slicedTime[1])
    employee.timeOutEvents.push(timeOutObj)
    return employee
}
//calculates hours worked by an employee on a certain date
function hoursWorkedOnDate(employee, date) {
    timeOutOnDate = employee.timeOutEvents.find(time => time.date === date)
    timeInOnDate = employee.timeInEvents.find(time => time.date === date)
    return (parseInt(timeOutOnDate.hour) - parseInt(timeInOnDate.hour)) / 100
}
//calculates pay for a employee on a certain date
function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}
//Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. 
//Amount should be returned as a number. HINT: You will need to find the available dates somehow...
function allWagesFor(employee) {
    return employee.timeInEvents.reduce((pay, day) => pay + wagesEarnedOnDate(employee, day.date), 0)
}
//calculates the sum of all wages for all employees
function calculatePayroll(employees) {
    return employees.reduce((pay, employee) => pay + allWagesFor(employee), 0)
}