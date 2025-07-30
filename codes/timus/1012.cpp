#include <bits/stdc++.h>
using namespace std;

struct bigint {
	typedef vector<int> lnum;
	const int base = 1000 * 1000 * 1000;
	lnum a;
	bigint() {}
	bigint(string s) {
		for (int i = (int)s.length(); i > 0; i -= 9)
			if (i < 9)
				a.push_back (atoi (s.substr (0, i).c_str()));
			else
				a.push_back (atoi (s.substr (i - 9, 9).c_str()));

	}
	void print() {
		printf ("%d", a.empty() ? 0 : a.back());
		for (int i = (int)a.size() - 2; i >= 0; --i)
			printf ("%09d", a[i]);
	}
	void operator += (const bigint &B) {
		const lnum &b = B.a;
		int carry = 0;
		for (size_t i = 0; i < max(a.size(),b.size()) || carry; ++i) {
			if (i == a.size())
				a.push_back (0);
			a[i] += carry + (i < b.size() ? b[i] : 0);
			carry = a[i] >= base;
			if (carry)  a[i] -= base;
		}
	}
};

bigint dp[1801][11];
int n, k;
bigint f(int i, int l) {
	if(i == 0) return bigint("1");
	bigint &res = dp[i][l]; if(!res.a.empty()) return res;
	for(int j = 0; j < k; j++) {
		if(j == 0 && (i == 1 || l == 0)) continue;
		res += f(i - 1, j);
	}
	return res;
}
int32_t main() {
	cin >> n >> k;
	f(n, k).print();
	return 0;
}