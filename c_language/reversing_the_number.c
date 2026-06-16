#include <stdio.h>
#include <string.h>

int main() {
    char num[10000], rev[10000];
    int i=0, j;
    char wi='i', wj='j';

    printf("Enter a number: ");
    scanf("%s", num);       

    int len = strlen(num);  
    j = len - 1;            

    while (j >= 0) {        
        rev[i] = num[j];    
        printf("%c%c%d\n", rev[i],wi,i);
        printf("%c%c%d\n", num[j],wj,j);
        i++;                
        j--;                
    }

    rev[i] = '\0';          

    printf("Reversed number: %s\n", rev);
    printf(" %d\n", len);
    return 0;
}
