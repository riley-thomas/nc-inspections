const Util = {
	bets_id : (a,b,c) => {
		a = "000".substring(0, "000".length - a.length) + a;
		b = "00".substring(0, "00".length - b.length) + b;
		c = "0000".substring(0, "0000".length - c.length) + c;
		return a+'-'+b+'-'+c;
	}
}
export default Util;