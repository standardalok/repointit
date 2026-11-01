#include <iostream>
using namespace std;

enum Color {
    RED,     
    GREEN,   
    BLUE     
};

int main() {
    Color c = GREEN;

    if (c == GREEN) {
        cout << "Color is green" << endl;
    }

    cout << "Value of BLUE: " << BLUE << endl;  
    return 0;
}