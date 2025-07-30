#include <iostream>
#include <string>
using namespace std;

const int m = 1e9 + 9;
int main() {
	string x; cin >> x;
	int y = 0;
	for (char i : x)y = (y * 10LL + i - '0') % m;
	for (int i = 1, f = 1;; i++) {
		f = 1LL * f * i % m;
		if (f == y) {
			cout << i << '\n';
			return 0;
		}
	}
}