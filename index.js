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
function createEmployeeRecords(arr){
    const newEmployees = []
    arr.forEach(employee => newEmployees.push(createEmployeeRecord(employee)))
    return newEmployees
}
//I want to merge these and just add a type arg
function createTimeInEvent(employee, timeInString){
    const timeInObj = {}
    const slicedTime = timeInString.split(" ")
    timeInObj.type = "TimeIn"
    timeInObj.date = slicedTime[0]
    timeInObj.hour = parseInt(slicedTime[1])
    employee.timeInEvents.push(timeInObj)
    return employee
}
function createTimeOutEvent(employee, timeOutString){
    const timeOutObj = {}
    const slicedTime = timeOutString.split(" ")
    timeOutObj.type = "TimeOut"
    timeOutObj.date = slicedTime[0]
    timeOutObj.hour = parseInt(slicedTime[1])
    employee.timeOutEvents.push(timeOutObj)
    return employee
}
//calculates hours worked by an employee on a certain date
function hoursWorkedOnDate(employee, date){
    timeOutOnDate = employee.timeOutEvents.find(time => time.date === date)
    timeInOnDate = employee.timeInEvents.find(time => time.date === date)
    return (parseInt(timeOutOnDate.hour)-parseInt(timeInOnDate.hour))/100
}
//calculates pay for a employee on a certain date
function wagesEarnedOnDate(employee, date){
    const hoursWorked = hoursWorkedOnDate(employee, date)
    return employee.payPerHour*hoursWorked
}
//Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. 
//Amount should be returned as a number. HINT: You will need to find the available dates somehow...
function allWagesFor(employee){
    let pay =0
    employee.timeInEvents.forEach(day => {
        pay+=wagesEarnedOnDate(employee, day.date)
    })
    return pay
}
//calculates the sum of all wages for all employees
function calculatePayroll(employees){
    let pay =0
    employees.forEach(employee => {
        pay+=allWagesFor(employee)
    })
    return pay
}
const csvDataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300]
]

const csvTimesIn = [
    ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
    ["Natalia", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1300"]],
    ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
    ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
]

const csvTimesOut = [
    ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Natalia", ["2018-01-01 2300", "2018-01-02 2300", "2018-01-03 2300"]],
    ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
    ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
]

let employeeRecords = createEmployeeRecords(csvDataEmployees)
employeeRecords.forEach(function (rec) {
    let timesInRecordRow = csvTimesIn.find(function (row) {
        return rec.firstName === row[0]
    })

    let timesOutRecordRow = csvTimesOut.find(function (row) {
        return rec.firstName === row[0]
    })

    timesInRecordRow[1].forEach(function (timeInStamp) {
        createTimeInEvent(rec, timeInStamp)
    })

    timesOutRecordRow[1].forEach(function (timeOutStamp) {
        createTimeOutEvent(rec, timeOutStamp)
    })
})
console.log(`copied data from indexText should output 12480.\nOutput: ` + calculatePayroll(employeeRecords))