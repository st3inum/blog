#include <iostream>
using namespace std;

const int mx = 1e6 + 2;
int m;
int f[mx] = {1};
int Pow(int a, int b) {
	int r = 1; while (b) {
		if (b & 1)r = 1LL * r * a % m;
		a = 1LL * a * a % m;
		b >>= 1;
	} return r;
}
int ncr(long long n, long long r) {
	if (n < r)return 0;
	// if n<m we can directly find nCr from the precalculated factorial
	if (n < m)return 1LL * f[n] * Pow(1LL * f[r] * f[n - r] % m, m - 2) % m;
	return 1LL * ncr(n % m, r % m) * ncr(n / m, r / m) % m;
}

int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);

	int t; cin >> t; while (t--) {
		long long n, k; cin >> n >> k >> m;
		for (int i = 1; i < mx; i++)f[i] = 1LL * f[i - 1] * i % m; // calculate for factorial modulo m
		long long a = (n + k - 1) / k;
		long long ex = a * k - n;
		cout << a << ' ' << ncr(ex + a - 1, a - 1) << '\n';
	}
}