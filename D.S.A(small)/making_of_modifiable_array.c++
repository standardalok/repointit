#include <iostream>
#include <algorithm>
using namespace std;

const int MAX = 100;
int arr[MAX];
int n = 0;  

void display() {
    if (n == 0) { cout << "Array is empty.\n"; return; }
    cout << "Array: ";
    for (int i = 0; i < n; i++) cout << arr[i] << " ";
    cout << "\n";
}

void insertAt() {
    if (n == MAX) { cout << "Array is full.\n"; return; }
    int pos, val;
    cout << "Enter position (0 to " << n << "): ";
    cin >> pos;
    if (pos < 0 || pos > n) { cout << "Invalid position.\n"; return; }
    cout << "Enter value: ";
    cin >> val;
    for (int i = n; i > pos; i--) arr[i] = arr[i - 1];
    arr[pos] = val;
    n++;
    cout << "Inserted.\n";
}

void deleteAt() {
    if (n == 0) { cout << "Array is empty.\n"; return; }
    int pos;
    cout << "Enter position to delete (0 to " << n - 1 << "): ";
    cin >> pos;
    if (pos < 0 || pos >= n) { cout << "Invalid position.\n"; return; }
    for (int i = pos; i < n - 1; i++) arr[i] = arr[i + 1];
    n--;
    cout << "Deleted.\n";
}

void updateAt() {
    int pos, val;
    cout << "Enter position to update (0 to " << n - 1 << "): ";
    cin >> pos;
    if (pos < 0 || pos >= n) { cout << "Invalid position.\n"; return; }
    cout << "Enter new value: ";
    cin >> val;
    arr[pos] = val;
    cout << "Updated.\n";
}

void linearSearch() {
    int key;
    cout << "Enter value to search: ";
    cin >> key;
    bool found = false;
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) {
            cout << "Found at index " << i << "\n";
            found = true;
        }
    }
    if (!found) cout << "Not found.\n";
}

void binarySearch() {
    int temp[MAX];
    copy(arr, arr + n, temp);
    sort(temp, temp + n);
    int key;
    cout << "Enter value to search: ";
    cin >> key;
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (temp[mid] == key) {
            cout << "Found (index " << mid << " in the sorted copy)\n";
            return;
        }
        if (temp[mid] < key) low = mid + 1;
        else high = mid - 1;
    }
    cout << "Not found.\n";
}

void sortArray() {
    int order;
    cout << "1. Ascending  2. Descending: ";
    cin >> order;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            bool swapNeeded = (order == 1) ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1];
            if (swapNeeded) swap(arr[j], arr[j + 1]);
        }
    }
    cout << "Sorted.\n";
}

void reverseArray() {
    for (int i = 0; i < n / 2; i++) swap(arr[i], arr[n - 1 - i]);
    cout << "Reversed.\n";
}

void stats() {
    if (n == 0) { cout << "Array is empty.\n"; return; }
    int mx = arr[0], mn = arr[0];
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        mx = max(mx, arr[i]);
        mn = min(mn, arr[i]);
        sum += arr[i];
    }
    cout << "Count   : " << n << "\n";
    cout << "Max     : " << mx << "\n";
    cout << "Min     : " << mn << "\n";
    cout << "Sum     : " << sum << "\n";
    cout << "Average : " << (double)sum / n << "\n";
}

void rotateArray() {
    if (n == 0) { cout << "Array is empty.\n"; return; }
    int k, dir;
    cout << "Rotate by how many positions? ";
    cin >> k;
    cout << "1. Left  2. Right: ";
    cin >> dir;
    k %= n;
    if (dir == 1) rotate(arr, arr + k, arr + n);
    else rotate(arr, arr + n - k, arr + n);
    cout << "Rotated.\n";
}

void removeDuplicates() {
    int newN = 0;
    for (int i = 0; i < n; i++) {
        bool dup = false;
        for (int j = 0; j < newN; j++) {
            if (arr[i] == arr[j]) { dup = true; break; }
        }
        if (!dup) arr[newN++] = arr[i];
    }
    cout << "Removed " << n - newN << " duplicate(s).\n";
    n = newN;
}

void countFrequency() {
    int key, count = 0;
    cout << "Enter value to count: ";
    cin >> key;
    for (int i = 0; i < n; i++) if (arr[i] == key) count++;
    cout << key << " appears " << count << " time(s).\n";
}

void evenOdd() {
    cout << "Even: ";
    for (int i = 0; i < n; i++) if (arr[i] % 2 == 0) cout << arr[i] << " ";
    cout << "\nOdd : ";
    for (int i = 0; i < n; i++) if (arr[i] % 2 != 0) cout << arr[i] << " ";
    cout << "\n";
}

void createArray() {
    cout << "How many elements (max " << MAX << ")? ";
    cin >> n;
    if (n < 0 || n > MAX) { n = 0; cout << "Invalid size.\n"; return; }
    cout << "Enter " << n << " elements: ";
    for (int i = 0; i < n; i++) cin >> arr[i];
}

int main() {
    int choice;
    do {
        cout << "\n===== ARRAY MENU =====\n"
             << " 1. Create array\n"
             << " 2. Display\n"
             << " 3. Insert at position\n"
             << " 4. Delete at position\n"
             << " 5. Update at position\n"
             << " 6. Linear search\n"
             << " 7. Binary search\n"
             << " 8. Sort\n"
             << " 9. Reverse\n"
             << "10. Max / Min / Sum / Average\n"
             << "11. Rotate\n"
             << "12. Remove duplicates\n"
             << "13. Count frequency of a value\n"
             << "14. Show even and odd numbers\n"
             << " 0. Exit\n"
             << "Choice: ";
        cin >> choice;

        switch (choice) {
            case 1:  createArray();      break;
            case 2:  display();          break;
            case 3:  insertAt();         break;
            case 4:  deleteAt();         break;
            case 5:  updateAt();         break;
            case 6:  linearSearch();     break;
            case 7:  binarySearch();     break;
            case 8:  sortArray();        break;
            case 9:  reverseArray();     break;
            case 10: stats();            break;
            case 11: rotateArray();      break;
            case 12: removeDuplicates(); break;
            case 13: countFrequency();   break;
            case 14: evenOdd();          break;
            case 0:  cout << "Goodbye!\n"; break;
            default: cout << "Invalid choice.\n";
        }
    } while (choice != 0);

    return 0;
}