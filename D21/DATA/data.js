let inputdata = `#ip 1
seti 123 0 5        // 0: r5 = 123
bani 5 456 5        // 1: r5 = 123 & 456
eqri 5 72 5         // 2: r5 = r5 === 72 ? 1 : 0  
addr 5 1 1          // 3: jump r5  
seti 0 0 1          // 4: goto 1
seti 0 2 5          // 5: r5 = 0
bori 5 65536 4      // 6: r4 = r5 | 65536 ( r4 = 65536)
seti 3935295 1 5    // 7: r5 = 3935295
bani 4 255 2        // 8: r2 = r4 & 255 (r2 = 0)
addr 5 2 5          // 9: r5 += r2
bani 5 16777215 5   // 10: r5 &= 16777215
muli 5 65899 5      // 11: r5 *= 65899
bani 5 16777215 5   // 12: r5 &= 16777215
gtir 256 4 2        // 13: r2 = 256 > r4 ? 1 : 0
addr 2 1 1          // 14: jump r2
addi 1 1 1          // 15: goto 17
seti 27 1 1         // 16: goto 28
seti 0 5 2          // 17: r2 = 0
addi 2 1 3          // 18: r3 = r2 + 1 (r3 = 1)
muli 3 256 3        // 19: r3 *= 256 (shift??)
gtrr 3 4 3          // 20: r3 = r3 > r4 ? 1 : 0
addr 3 1 1          // 21: jump r3
addi 1 1 1          // 22: goto 24
seti 25 0 1         // 23: goto 26
addi 2 1 2          // 24: r2++
seti 17 7 1         // 25: goto 18
setr 2 2 4          // 26: r4 = r2
seti 7 6 1          // 27: goto 8
eqrr 5 0 2          // 28: r2 = r0 === r5 ? 1 : 0
addr 2 1 1          // 29: jump r2 (exit if r0 === 5)
seti 5 4 1`;        // 30: goto 6