#include <stdio.h>
#include <conio.h> // Required for getch()

int main() {
    char ch;

    printf("Press any key to see the magic...\n");
    ch = getch(); // Program stops here and waits
    
    printf("You pressed a key! Program is now closing.");
    
    return 0;
}