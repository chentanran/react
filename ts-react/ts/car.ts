
interface Radio {
  radioButton(): void;
}

interface Button extends Radio {
  button(): void;
}

class car implements Radio {
  radioButton() {

  }

  button() {

  }
}

class che implements Button {
  radioButton() {

  }

  button() {
    
  }
}