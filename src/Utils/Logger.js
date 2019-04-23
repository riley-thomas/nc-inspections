
const Logger = {
	starting : () => {
		console.log('%c********************','color:green')
		for(let i = 0;i<=10;i++){
			if(i === 5){
				console.log('%c*  Starting EH App  ','color:green')
			} else {
				console.log('%c*','color:green')
			}
		}
		console.log('%c********************','color:green')
	},
	msg : (msg,color) =>{
		if(color) {
			console.log('%c'+msg, 'color:'+color);
		} else {
			console.log(msg);
		}
	}
}

export default Logger;