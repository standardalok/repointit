#include <stdio.h>

int main() {
    int n, i;
    
    printf("How many strings do you want to enter? ");
    scanf("%d", &n);

    // 2D Array: [number of words][max length of each word]
    char words[2][50]; 

    // Taking inputs
    printf("Enter %d strings:\n", n);
    i = 0;
    while (i < 2) {
        scanf("%s", words[i]); // Store each word in its own row
        i++;
    }

    // Printing the output
    printf("\nYour string have: ");
    i = 0;
    while (i < 2) {
        printf("%s", words[i]);
        
        // Add a comma only if it's NOT the last word
if (i < 10 - 1) {
            printf(", ");
        }
        i++;
    }
    printf("\n");

    return 0;
}