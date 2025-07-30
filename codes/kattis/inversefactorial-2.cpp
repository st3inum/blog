#include <iostream>
#include <string>
using namespace std;

const int m1 = 1e9 + 11, m2 = 1e9 + 125;
int main() {
	string x; cin >> x;
	int y1 = 0, y2 = 0;
	for (char i : x) {
		y1 = (y1 * 10LL + i - '0') % m1;
		y2 = (y2 * 10LL + i - '0') % m2;

	}
	long long y = 1LL * y1 * m2 + 1LL * y2 * m1;
	for (int i = 1, f1 = 1, f2 = 1;; i++) {
		f1 = 1LL * f1 * i % m1;
		f2 = 1LL * f2 * i % m2;
		long long f = 1LL * f1 * m2 + 1LL * f2 * m1;
		if (f == y) {
			cout << i << '\n';
			return 0;
		}
	}
}