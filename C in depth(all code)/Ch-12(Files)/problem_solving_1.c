#include <stdio.h>
int main() {
    FILE *src = fopen("180_paragraphs_data.txt", "r");
    FILE *dst = fopen("target.txt", "w");
    int ch;
    int is_blank_line = 1; 
    if (src == NULL || dst == NULL) {
        printf("Error opening files.\n");
        return 1;
    }
    while ((ch = fgetc(src)) != EOF) {
        if (ch == '\n') {
            if (is_blank_line == 0) {
                fputc(ch, dst);
            }
            is_blank_line = 1;
        } 
        else {
            is_blank_line = 0; 
            fputc(ch, dst);
        }
    }
    fcloseall();
    printf("Done!\n");
    return 0;
}