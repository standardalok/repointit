#include<stdio.h>
#include<stdlib.h>

typedef struct Node{
    int data;
    struct Node *nxt;
}Node;

Node *head;

void Insert(int d){
    Node *tmp1=(Node *)malloc(sizeof(Node));
    tmp1->data=d;
    tmp1->nxt=NULL;
    if(head==NULL){
        head=tmp1;
        return;
    }
    Node *tmp2=head;
    while(tmp2->nxt!=NULL){
        tmp2=tmp2->nxt;
    }
    tmp2->nxt=tmp1;
};

void Print(){
    Node *tmp=head;
    while(tmp!=NULL){
        printf("%d\n",tmp->data);
        tmp=tmp->nxt;
    }
};


void Delete(int w){
    Node *tmp1=head;
    if(w==1){
        head=tmp1->nxt;
        free(tmp1);
        return;
    }

    for(int i=0;i<w-2;i++){
        tmp1=tmp1->nxt;
    }
    Node *tmp2=tmp1->nxt;
    tmp1->nxt=tmp2->nxt;
    free(tmp2);


};

int main(){
    head=NULL;
    int n;
    Insert(2);
    Insert(3);
    Insert(4);
    Insert(5);

    Print();

    printf("Enter the position at which you want to delete?");
    scanf("%d",&n);

    Delete(n);

    printf("The Number At The Position %d is deleted\n",n);
    Print();
    
    return 0;
}
