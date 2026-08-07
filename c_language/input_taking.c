#include <stdio.h>

int main()
{
    int a, b;
    char symbol;

    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b); // space instead of comma

    printf("Enter the symbol (+, -, *, /): ");
    scanf(" %c", &symbol); // space before %c to skip leftover newline

    if (symbol == '+' || symbol == '-' || symbol == '*' || symbol == '/')
    {
        if (symbol == '+')
        {
            printf("The sum of the two numbers is: %d\n", a + b);
        }
        else if (symbol == '-')
        {
            printf("The difference of the two numbers is: %d\n", a - b);
        }
        else if (symbol == '*')
        {
            printf("The product of the two numbers is: %d\n", a * b);
        }
        else if (symbol == '/')
        {
            if (b != 0)
            {
                printf("The division of the two numbers is: %.2f\n", (float)a / b);
            }
            else
            {
                printf("Error: Division by zero not allowed\n");
            }
        }
    }
    else
    {
        printf("Error: Enter a valid symbol (+, -, *, /)\n");
    }

    return 0;
}
