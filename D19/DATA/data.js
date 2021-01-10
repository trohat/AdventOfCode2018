let inputdata = `#ip 2
addi 2 16 2     // 0: goto 17
seti 1 0 1      // 1: r1 = 1
seti 1 4 3      // 2: r3 = 1
mulr 1 3 4      // 3: r4 = r1 * r3
eqrr 4 5 4      // 4: r4 === r5 ? r4 = 1 : r4 = 0
addr 4 2 2      // 5: jump r4 (goto r4 + 6)
addi 2 1 2      // 6: goto 8
addr 1 0 0      // 7: r0 += r1
addi 3 1 3      // 8: r3++  
mulr 3 1 4
gtrr 3 5 4      // 9: r3 > r5 ? r4 = 1 : r4 = 0
addr 2 4 2      // 10: jump r4
seti 2 5 2      // 11: goto 3  
addi 1 1 1      // 12: r1++
gtrr 1 5 4      // 13: r1 > r5 ? r4 = 1 : r4 = 0
addr 4 2 2      // 14: jump r4 (goto r4 + 15) 
seti 1 1 2      // 15: goto 2
mulr 2 2 2      // 16: exit
addi 5 2 5      // 17: r5 += 2      2
mulr 5 5 5      // 18: r5 ^= 2      4
mulr 2 5 5      // 19: r5 *= 19     76
muli 5 11 5     // 20: r5 *= 11     836
addi 4 5 4      // 21: r4 += 5      5
mulr 4 2 4      // 22: r4 *= 22     110
addi 4 9 4      // 23: r4 += 9      119
addr 5 4 5      // 24: r5 += r4     955
addr 2 0 2      // 25: jump r0
seti 0 0 2      // 26: goto 1
setr 2 3 4      // 27: r4 = 27       27
mulr 4 2 4      // 28: r4 *= 28     756
addr 2 4 4      // 29: r4 += 29     785 
mulr 2 4 4      // 30: r4 *= 30    23550
muli 4 14 4     // 31: r4 *= 14    329700
mulr 4 2 4      // 32: r4 *= 32   10550400
addr 5 4 5      // 33: r5 += r4   10551355
seti 0 6 0      // 34: r0 = 0
seti 0 3 2`;    // 35: goto 1        