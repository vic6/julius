function round2Fixed(value) {
  let result = +value;
  // Shift
  result = result.toString().split('e');
  result = Math.round(+(`${result[0]  }e${  result[1] ? +result[1] + 2 : 2}`));
  // Shift back
  result = result.toString().split('e');
  return (+(`${result[0]  }e${  result[1] ? +result[1] - 2 : -2}`)).toFixed(2);
}

export default round2Fixed;
