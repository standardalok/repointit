#include <stdio.h>

typedef int marking; 
typedef int function1(float, int); 

int add(float a, int b) {
    return (int)a + b; 
}
int main() {
    marking w = add(10.0f, 20); 
    
    printf("The result is: %d\n", w);
    
    return 0;
}