#! /usr/bin/env node
import inquirer from "inquirer";
//BankAccount Class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //Debit Money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful. Remaining Balance : $${this.balance}`);
        }
        else {
            console.log("Insufficient Balance");
        }
    }
    //Credit Money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
    }
    //Check Balance
    checkBalance() {
        console.log(`Current Balance: $${this.balance}`);
    }
}
//Create Customer Class
class Customer {
    first_Name;
    last_Name;
    gender;
    age;
    mobile_number;
    account;
    constructor(first_Name, last_Name, gender, age, mobile_number, account) {
        this.first_Name = first_Name;
        this.last_Name = last_Name;
        this.gender = gender;
        this.age = age;
        this.mobile_number = mobile_number;
        this.account = account;
    }
}
//Create Bank Account
const accounts = [
    new BankAccount(1001, 600),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
];
//Create Customer
const customers = [
    new Customer("Rida", "Khan", "Female", 19, 3354546564, accounts[0]),
    new Customer("Samia", "Khan", "Female", 20, 3354336564, accounts[1]),
    new Customer("Arhama", "Khan", "Male", 23, 3356646564, accounts[2]),
];
//Function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number: ",
        });
        const customer = customers.find((customer) => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.first_Name} ${customer.last_Name} \n`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Select an opertion",
                    choices: ["Desposit", "Withdraw", "Check Balance", "Exit"],
                },
            ]);
            switch (ans.select) {
                case "Desposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:",
                    });
                    10;
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to Widthdraw:",
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting Bank Program...");
                    console.log("\n Thank you for using our services. Have a grat day!");
                    return;
            }
        }
        else {
            console.log("Invalid Account Number.Please Try Again ");
        }
    } while (true);
}
service();
