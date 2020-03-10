// Business requirements
// You are required to categorize people, given their date of birth, into three different age groups—Infants,
// Children, and Adults. Indicate with a true or false flag whether they are of a legal age to sign a contract.
// A person is deemed to be an infant if they are less than two years old. Infants cannot sign contracts.
// A person is deemed to be a child if they are less than 18 years old. Children cannot sign contracts either.
// A person is deemed to be an adult if they are more than 18 years of age. Only adults can sign contracts.
// For reporting purposes, each type of person must be able to print their details.
// This should include the following:Date of birthCategory of personWhether they can sign contracts or not

enum PersonCategory {
    Infant,
    Child,
    Adult,
    Undefined
}

interface IPerson {
    Category: PersonCategory;
    canSignContracts(): boolean;
    printDetails(): void;
}

interface IPersonFactory {
    getPerson(dateOfBirth: Date) : IPerson;
}

abstract class Person implements IPerson {
    Category: PersonCategory;
    private DateOfBirth: Date;

    protected constructor(dateOfBirth: Date) {
        this.DateOfBirth = dateOfBirth;
        this.Category = PersonCategory.Undefined;
    };

    abstract canSignContracts(): boolean;

    printDetails(): void {
        console.log(`Person : `);
        console.log(`Date of Birth : `
            + `${this.DateOfBirth.toDateString()}`);
        console.log(`Category      : `
            + `${PersonCategory[this.Category]}`);
        console.log(`Can sign      : `
            + `${this.canSignContracts()}`);
    };
}

class Infant extends Person {
    constructor(dateOfBirth: Date) {
        super(dateOfBirth);
        this.Category = PersonCategory.Infant;
    }
    canSignContracts(): boolean {
        return false;
    }
}

class Child extends Person {
    constructor(dateOfBirth: Date) {
        super(dateOfBirth);
        this.Category = PersonCategory.Child;
    }
    canSignContracts(): boolean {
        return false;
    }
}

class Adult extends Person  {
    constructor(dateOfBirth: Date) {
        super(dateOfBirth);
        this.Category = PersonCategory.Adult;
    }
    canSignContracts(): boolean {
        return true;
    }
}

class PersonFactory implements IPersonFactory {
    getPerson(dateOfBirth: Date) : IPerson {
        let dateNow = new Date(); // defaults to now.
        let currentMonth = dateNow.getMonth() + 1;
        let currentDate = dateNow.getDate();

        let dateTwoYearsAgo = new Date(
            dateNow.getFullYear() - 2,
            currentMonth, currentDate);

        let date18YearsAgo = new Date(
            dateNow.getFullYear() - 18,
            currentMonth, currentDate);

        if (dateOfBirth >= dateTwoYearsAgo) {
            return new Infant(dateOfBirth);
        }
        if (dateOfBirth >= date18YearsAgo) {
            return new Child(dateOfBirth);
        }
        return new Adult(dateOfBirth);
    }
}

(function main(){

    let factory = new PersonFactory();
    let p1 = factory.getPerson(new Date(2017, 0, 20));
    p1.printDetails();
    let p2 = factory.getPerson(new Date(2010, 0, 20));
    p2.printDetails();
    let p3 = factory.getPerson(new Date(1969, 0, 20));
    p3.printDetails();

})();
