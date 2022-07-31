// JS：第2章\2.1\iperson.ts
interface IPerson {
  firstName: string,
  lastName: string,
  hi: () => string
}

let a: IPerson = {
  firstName: "Y",
  lastName: "L",
  hi: function (): string { return `Hi ${this.firstName}` }
}
console.log(a.hi())