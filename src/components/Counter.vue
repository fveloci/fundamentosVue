<template>
  <h2>{{customTitle || 'Counter'}}</h2>
  <p>{{counter}} <sup>2</sup> = {{squareCounter}}</p>
  <p data-testid="counter">{{counter}}</p>
  <div>
    <button @click="increase">+1</button>
    <button @click="decrease">-1</button>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    start: {
      type: Number,
      // required: true,
      default: 100,
      validator(value) {
        return value > 100 
      }
    }
  },
  data() {
    return {
      counter: this.start
    }
  },  
  methods: {
    getSquareValue() {
      return this.counter * this.counter
    },
    increase() {
      this.counter = this.counter + 1
    },
    decrease() {
      this.counter = this.counter - 1
    }
  },
  computed: {
    squareCounter() {
      const result = this.counter * this.counter
      console.log('computed squareCounter')
      return result
    },
    customTitle() {
      return this.title ? this.title : 'Counter'
    }
  }
}
</script>

<style>

button {
  background-color: darkgray;
  margin: 10px;
  padding: 5px;
}

button:hover {
  background-color: aliceblue;
}
</style>