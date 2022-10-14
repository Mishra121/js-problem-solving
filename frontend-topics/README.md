# Frontend Topics & Interview Questions

> Click :star: if you like the project. Pull Requests are highly appreciated.

1. ### What is a prototype chain

   **Prototype chaining** is used to build new types of objects based on existing ones. It is similar to inheritance in a class based language.

   The prototype on object instance is available through **Object.getPrototypeOf(object)** or \***\*proto\*\*** property whereas prototype on constructors function is available through **Object.prototype**.

   ![Screenshot](images/prototype_chain.png)


2. ### What is the difference between Call, Apply and Bind

   The difference between Call, Apply and Bind can be explained with below examples,

   **Call:** The call() method invokes a function with a given `this` value and arguments provided one by one

   ```javascript
   var employee1 = { firstName: "John", lastName: "Rodson" };
   var employee2 = { firstName: "Jimmy", lastName: "Baily" };

   function invite(greeting1, greeting2) {
     console.log(
       greeting1 + " " + this.firstName + " " + this.lastName + ", " + greeting2
     );
   }

   invite.call(employee1, "Hello", "How are you?"); // Hello John Rodson, How are you?
   invite.call(employee2, "Hello", "How are you?"); // Hello Jimmy Baily, How are you?
   ```

   **Apply:** Invokes the function with a given `this` value and allows you to pass in arguments as an array

   ```javascript
   var employee1 = { firstName: "John", lastName: "Rodson" };
   var employee2 = { firstName: "Jimmy", lastName: "Baily" };

   function invite(greeting1, greeting2) {
     console.log(
       greeting1 + " " + this.firstName + " " + this.lastName + ", " + greeting2
     );
   }

   invite.apply(employee1, ["Hello", "How are you?"]); // Hello John Rodson, How are you?
   invite.apply(employee2, ["Hello", "How are you?"]); // Hello Jimmy Baily, How are you?
   ```

   **bind:** returns a new function, allowing you to pass any number of arguments

   ```javascript
   var employee1 = { firstName: "John", lastName: "Rodson" };
   var employee2 = { firstName: "Jimmy", lastName: "Baily" };

   function invite(greeting1, greeting2) {
     console.log(
       greeting1 + " " + this.firstName + " " + this.lastName + ", " + greeting2
     );
   }

   var inviteEmployee1 = invite.bind(employee1);
   var inviteEmployee2 = invite.bind(employee2);
   inviteEmployee1("Hello", "How are you?"); // Hello John Rodson, How are you?
   inviteEmployee2("Hello", "How are you?"); // Hello Jimmy Baily, How are you?
   ```

   Call and apply are pretty interchangeable. Both execute the current function immediately. You need to decide whether it’s easier to send in an array or a comma separated list of arguments. You can remember by treating Call is for **comma** (separated list) and Apply is for **Array**.

   Whereas Bind creates a new function that will have `this` set to the first parameter passed to bind().

3. ### differences between for(..in) and for(..of)

    for (..in) loop: The JavaScript for (..in) statement loops through the enumerable properties of an object. The loop will iterate over all enumerable properties of the object itself and those the object inherits from its constructor’s prototype.

    ```javascript
      var person = {
        firstName: "YoDoe",
        lastName: "<br>Parker Circus ",
        rank: 13
      };
      var userId = "";
      var i;
      for (i in person) {
        userId += person[i];
      }
      document.getElementById("demo").innerHTML = userId;
    ```
    Sample Output
    ```
      YoDoe
      Parker Circus 13
    ```

    for (..of) loop: This for (..of) statement lets you loop over the data structures that are iterable such as Arrays, Strings, Maps, Node Lists, and more.

    ```javascript
      var arr = [1, 2, 3, 4];
      var sum = 0;
      var i;
      for (i of arr) {
        sum += arr[i];
      }
      console.log(sum) // 10
    ```