// BUDGET CONTROLLER
var budgetController= (function(){

    //Expense Constructor
    var Expense = function(id,description,value){
         id = this.id;
         description = this.description;
         value = this.value;
    };

    var Income = function(id,description,value){
        this.id = id ;
        this.description;
        this.value = value;
   };
    
   var data = {
     allIncomes : [],
     allExpenses : [],
     totalExpense : 0,
     totalIncome :0
   };
   
  

}());

//USER INTERFACE CONTROLLER
var UIController = (function(){
      
    var DomStrs = {
        inputType : ".add__type",
        descriptionType : ".add__description",
        valueType : ".add__value",
        inputBtn : ".add__btn"
    };

    return{
        getinput: function(){

            return{
             type : document.querySelector(DomStrs.inputType).value ,
             desc : document.querySelector(DomStrs.descriptionType).value ,
             value : document.querySelector(DomStrs.valueType).value
            };
        },getDOMstings: function(){
            return DomStrs;
        }
        
    };

})();


//GLOBAL APP CONTROLLER
var Controller = (function(budgetCtrl,UICtrl)
{
    
    var setupEventlisteners = function(){

        var DOM = UICtrl.getDOMstings() ;

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress',function(event){
            if(event.keyCode ==13){            
                ctrlAddItem();
            }
        })

    };
    
  
    var  ctrlAddItem  = function(){

        //1.get the field input data
        var input = UICtrl.getinput();console.log(input);
        //2.get the itemm to the budget controller

        //3.add the new item to the Ui

        //4.calculate the budget

        //5.Display.the budget on the ui

    };

    return{
        init : function() {
            console.log("The app is running. ");
            setupEventlisteners();
        }
    }; 
   
    
})(budgetController,UIController);

Controller.init();